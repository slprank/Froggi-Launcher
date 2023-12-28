import { ControllerButtons, PlayerController } from "../models/types/controller";
import { ObsControllerCommand } from "../models/types/obsTypes";
import { isMatch } from "lodash";


const removeFalseValues = (buttonInputs: ControllerButtons) => {
    return {
        ...(
            Object.entries(buttonInputs).filter(([_, value]) => value) as [
                key: keyof ControllerButtons,
                value: boolean,
            ][]
        ).reduce((a, b) => {
            a[b[0]] = b[1];
            return a;
        }, {} as { [button in keyof ControllerButtons]: boolean }),
    }
}

export const getOverlappingCommands = (commands: ObsControllerCommand[] | undefined, buttonInputs: ControllerButtons | undefined): ObsControllerCommand[] => {
    if (!buttonInputs || !commands) return [];
    return commands.filter((command) =>
        isMatch(removeFalseValues(command.inputs), removeFalseValues(buttonInputs)) || isMatch(removeFalseValues(buttonInputs), removeFalseValues(command.inputs)),
    );
}

export const getSubsetCommands = (commands: ObsControllerCommand[] | undefined, buttonInputs: ControllerButtons | undefined): ObsControllerCommand[] => {
    if (!buttonInputs || !commands) return [];
    return commands.filter((command) =>
        isMatch(removeFalseValues(command.inputs), removeFalseValues(buttonInputs))
    );
}

export const getControllerIndex = (controller: PlayerController): number => {
    return Number(
        Object.entries(controller).find(([_, value]) => value.isConnected)?.[0],
    );
};