import { AutoUpdaterStatus } from "../enum";

export interface AutoUpdater {
  progress: string | undefined;
  status: AutoUpdaterStatus;
  version: string | undefined;
}