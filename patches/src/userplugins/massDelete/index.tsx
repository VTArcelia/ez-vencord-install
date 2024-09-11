/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { ApplicationCommandInputType, ApplicationCommandOptionType } from "@api/Commands";
import { Devs } from "@utils/constants";
import { ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalRoot, openModal } from "@utils/modal";
import definePlugin from "@utils/types";
import { Button, Constants, Forms, MessageStore, RestAPI, showToast, Text, Toasts, UserStore } from "@webpack/common";
import { Message } from "discord-types/general";

function sleep(ms: number) {
    return new Promise<void>(resolve => setTimeout(() => resolve(), ms));
}

export default definePlugin({
    name: "MassDelete",
    authors: [Devs.sin],
    description: "Mass deletes / Purges an amount of messages from a channel.",

    commands: [{
        name: "purge",
        description: "Purges an amount of messages from a channel",
        options: [{
            name: "amount",
            description: "Amount of messages to delete",
            type: ApplicationCommandOptionType.NUMBER,
            required: true,
        }],
        inputType: ApplicationCommandInputType.BUILT_IN,


        execute(args, ctx) {
            const amount = parseInt(args[0].value);
            const userId = UserStore.getCurrentUser().id;
            const channelId = ctx.channel.id;



            async function onConfirm() {
                let before = MessageStore.getMessages(channelId).reduce((prev, current) => (prev && prev.timestamp.getTime() > current.timestamp.getTime()) ? prev : current);

                const loadMessagesRest = async () => await RestAPI.get({ url: Constants.Endpoints.MESSAGES(channelId), query: { before, limit: 100 } });

                const loadMessages = async (): Promise<Message[] | false> => {
                    const response = await loadMessagesRest()
                        .then(response => response.body as Message[])
                        .catch(async error => {
                            if (error.status === 429 && error.body.retry_after) {
                                showToast(`You have been rate limited. Waiting ${error.body.retry_after}s`, Toasts.Type.FAILURE);
                                await sleep(error.body.retry_after * 1000 + 100);
                                return await loadMessagesRest().then(response => response.body as Message[]);
                            }

                            showToast(`Error while loading messages: ${error}`, Toasts.Type.FAILURE);
                            throw error;
                        });
                    if (!response.length) return false;
                    return response.filter(m => m.author.id === userId);
                };

                const deleteMessageRest = async (messageId: string) => await RestAPI.del({
                    url: Constants.Endpoints.MESSAGE(channelId, messageId)
                });

                const deleteMessage = async (messageId: string) => {
                    await deleteMessageRest(messageId).catch(async error => {
                        if (error.status === 429 && error.body.retry_after) {
                            showToast(`You have been rate limited. Waiting ${error.body.retry_after}s`, Toasts.Type.FAILURE);
                            await sleep(error.body.retry_after * 1000 + 100);
                            return await deleteMessage(messageId);
                        }

                        showToast(`Error while deleting messages: ${error}`, Toasts.Type.FAILURE);
                        throw error;
                    });
                };

                let messages = await loadMessages();

                if (!messages) return showToast("No more messages to delete!", Toasts.Type.FAILURE);

                console.log(messages);

                for (let n = 0; n < amount; n++) {
                    let message = messages[n];

                    if (!message) {
                        while (!message) {
                            await sleep(200);
                            before = messages[n - 1].id;
                            const newMessages = await loadMessages();
                            if (!newMessages) return showToast("No more messages to delete!", Toasts.Type.FAILURE);
                            messages = messages.concat(...newMessages);
                            message = messages[n];
                        }
                    }

                    await sleep(1500);
                    await deleteMessage(message.id);

                    console.log("Deleted message", message.content, `(${message.id})`);
                }

                showToast(`Successfully deleted ${amount} messages!`, Toasts.Type.SUCCESS);
            }

            openModal(props => <ModalRoot {...props}>
                <ModalHeader className="vc-st-modal-header">
                    <Forms.FormTitle tag="h2">
                        Mass Delete
                    </Forms.FormTitle>

                    <ModalCloseButton onClick={close} />
                </ModalHeader>
                <ModalContent>
                    <Text variant="text-md/normal">Are you sure you want to mass delete {args[0].value} messages?</Text>
                    <Text variant="text-md/normal">WARNING: Too many deletions might cause your account to get flagged.</Text>
                </ModalContent>

                <ModalFooter>
                    <Button
                        color={Button.Colors.TRANSPARENT}
                        look={Button.Looks.LINK}
                        onClick={() => props.onClose()}
                    >
                        Cancel
                    </Button>
                    <Button
                        color={Button.Colors.RED}
                        onClick={() => { props.onClose(); onConfirm(); }}
                    >
                        Delete
                    </Button>
                </ModalFooter>
            </ModalRoot >);
        },
    }]
});
