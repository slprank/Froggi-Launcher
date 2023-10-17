enum ControllerInputType {
	ButtonsPressed = 'buttonsPressed',
	ButtonsPressedPrevious = 'buttonsPressedPrevious',
	ButtonsPressedInstant = 'buttonsPressedInstant',
	ButtonsReleased = 'buttonsReleased',
	AnalogByteL = 'analogByteL',
	AnalogByteR = 'analogByteR',
	AnalogJoystickX = 'analogJoystickX',
	AnalogJoystickY = 'analogJoystickY',
	AnalogCStickY = 'analogCStickY',
	AnalogCStickX = 'analogCStickX',
	AnalogL = 'analogL',
	AnalogR = 'analogR',
	IsPlugged = 'isPlugged',
}

export interface ControllerButtons {
	isAPressed: boolean;
	isBPressed: boolean;
	isDPadLeftPressed: boolean;
	isDPadRightPressed: boolean;
	isDPadUpPressed: boolean;
	isDPadDownPressed: boolean;
	isLPressed: boolean;
	isRPressed: boolean;
	isStartPressed: boolean;
	isXPressed: boolean;
	isYPressed: boolean;
	isZPressed: boolean;
}

export type ControllerInputs = {
	[option in ControllerInputType]: number;
} & {
	controllerIndex: number;
	buttons: ControllerButtons
};

export type PlayerControllerBytes = {
	[index: number]: ControllerInputs;
};

export type PlayerController = {
	[index: number]: ControllerInputs;
};
