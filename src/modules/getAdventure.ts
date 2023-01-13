import { EmbedBuilder } from "@discordjs/builders";

import { Adventure } from "../interfaces/Adventure";

/**
 * Fetches a random adventure.
 *
 * @returns {Promise<EmbedBuilder>} The adventure embed.
 */
export const getAdventure = async (): Promise<EmbedBuilder> => {
  const adventureData = await fetch(
    "https://www.naomi.lgbt/assets/data/adventures.json"
  );
  const adventures: Adventure[] = await adventureData.json();
  const adventure = adventures[Math.floor(Math.random() * adventures.length)];

  const embed = new EmbedBuilder();
  embed.setTitle(adventure.game);
  embed.setImage(
    `https://www.naomi.lgbt/assets/img/games/${adventure.fileName}`
  );
  embed.setFooter({
    text: `Donate so we can get more? https://donate.naomi.lgbt/`,
    iconURL: `https://cdn.nhcarrigan.com/profile.png`,
  });

  return embed;
};