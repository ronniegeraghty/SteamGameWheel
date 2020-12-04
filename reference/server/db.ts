import { createConnection, Connection, ConnectionManager } from "typeorm";
import { EventEmitter } from "events";
import { InternalServerError } from "./errors";
import { SteamGameLibrary } from "./entities/SteamGameLibrary";

const Events = {
  Connected: "onconnected",
  Disconnected: "ondisconnected",
};

let eventManager: EventEmitter = new EventEmitter();
let m_Connection: Connection | null = null;
const connectionManager: ConnectionManager = new ConnectionManager();
//
(async function () {
  try {
    m_Connection = connectionManager.create({
      name: process.env.DB_NAME,
      type: "sqlite",
      database: "./sgw.sqlite",
      entities: [SteamGameLibrary],
    });
    await m_Connection.connect();
    await m_Connection.synchronize();
    eventManager.emit(Events.Connected, m_Connection);
  } catch (err) {
    throw err;
  }
})();

/**
 * IDBDisconnectOptions
 * @param {boolean} force - If it sets true, forcely disconnect from DB.
 */
interface IDBDisconnectOptions {
  force?: boolean;
}

/**
 * Disconnect from Database
 * @param {IDBDisconnectOptions} options - Options
 * @return {Promise<any|Error>}
 */
async function disconnect(
  options?: IDBDisconnectOptions
): Promise<any | Error> {
  if (m_Connection === null) return Promise.resolve();

  let eventInvoked = false;

  try {
    await m_Connection.close();

    eventManager.emit(Events.Disconnected);
    m_Connection = null;

    eventInvoked = true;
  } catch (err) {
    return Promise.reject(err);
  } finally {
    let filteredOption: IDBDisconnectOptions =
      typeof options === "undefined" ? {} : options;

    if (filteredOption.force && !eventInvoked) {
      eventManager.emit(Events.Disconnected);
    }
  }
}

export default {
  // Properties
  Events,

  // Getters
  /**
   * Get Connection of TypeORM. Note that this will throw InternalServerError if no connection available
   * @param {void}
   * @return {TypeORM.Connection} - Connection of TypeORM
   */
  get connection(): Connection {
    if (m_Connection === null) {
      throw new InternalServerError(
        "Failed to obtain connection for Database."
      );
    }

    return m_Connection;
  },

  // Functions
  disconnect,
  eventManager,
};
