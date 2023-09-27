import type { VisibilityOption } from "../enum";

export type SelectedVisibilityOption = {
    [option in VisibilityOption]: boolean;
};