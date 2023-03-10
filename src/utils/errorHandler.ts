import { WebhookClient } from "discord.js";
import { v4 } from "uuid";

import { logHandler } from "./logHandler";

/**
 * Handles logging the error to the terminal and sending it to the debug webhook.
 *
 * @param {string} context A brief description of where the error occurred.
 * @param {Error} err The error object.
 * @returns {string} The error ID.
 */
export const errorHandler = async (context: string, err: unknown) => {
  const error = err as Error;
  logHandler.log("error", `${context}: ${error.message}`);
  logHandler.log("error", JSON.stringify(error.stack, null, 2));
  const id = v4();
  if (process.env.DEBUG_HOOK) {
    const debugHook = new WebhookClient({ url: process.env.DEBUG_HOOK });
    await debugHook.send({
      content: `${context}: ${error.message}`,
    });
    await debugHook.send({
      content: "```\n" + JSON.stringify(error.stack, null, 2) + "\n```",
    });
    await debugHook.send({
      content: `Error ID: ${id}`,
    });
  }
  return id;
};
