import type { VisibilityOption } from "../enum";

export type SelectedVisibilityOption = {
    [option in VisibilityOption]: VisibilityToggle;
};

export enum VisibilityToggle {
    Disabled = 0,
    True = 1,
    False = 2,
}