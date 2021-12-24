import { mongodb_connect_function } from "./database/connection";
import { ErrorMessage } from "./util/functions";
import type { EconomyConfigOptions } from "./typings/typings";
import { DataBaseController } from "./database/controller";
import { fetchManager } from "./managers/fetch";
import { CurrencyHandler } from "./structures/currency";
import { RewardManager } from "./managers/reward";

/**
 * The Lewd Labs Economy for discord bots with mongodb
 */
export class IEconomy {
  /** Our constructor config options */
  public config!: EconomyConfigOptions;
  /** Allows the raw db function to be accessed throughout the Economy for more user customization. */
  private db: DataBaseController = new DataBaseController();
  /** Controls fetch methods four our economy */
  public fetchManager: fetchManager = new fetchManager();
  /** Controls user ballance methods */
  public currencyHandler: CurrencyHandler = new CurrencyHandler();
  /** controls common reward methods */
  public RewardManager: RewardManager = new RewardManager();
  /**
   * Constructor
   * @param configOptions The options to pass to the constructor. These are required.
   */
  public constructor(configOptions?: EconomyConfigOptions) {
    if (configOptions) {
      let missing: string[] = [];
      if (!configOptions.currency) missing.push("currency");
      if (!configOptions.defaultBankLimit) missing.push("defaultBankLimit");
      if (!configOptions.robEnabled) missing.push("robEnabled");
      if (!configOptions.shopEnabled) missing.push("shopEnabled");
      // Checks if the array has at least one value
      if (missing[1]) {
        throw new Error(
          ErrorMessage(
            `You did not pass all the required options for the LewdLabs Economy Class.\n You are missing: ${missing.join(
              ", "
            )}`
          )
        );
      }
      this.config = configOptions;
    }
  }

  /**
   * A simple function to connecto mongodb.
   * This is not required to use, but if you do this must be called before other parts of the database or else functions will not work.
   * @param url Your mongodb URL
   * @see https://www.mongodb.com/ for support with setting up your database.
   */
  public async connect(url: string): Promise<void> {
    if (!url)
      throw new Error(ErrorMessage("No URL passed for database connection."));
    else mongodb_connect_function(url);
  }

  /** Loads all the db documents */
  public init(): void {
    this.db.init();
  }
}
