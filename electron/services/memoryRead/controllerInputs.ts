import DolphinMemory from 'dolphin-memory-reader';
import { ByteSize } from 'dolphin-memory-reader/dist/types/enum';

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

const controllers = [
	0x804c1fac + 0x44 * 0,
	0x804c1fac + 0x44 * 1,
	0x804c1fac + 0x44 * 2,
	0x804c1fac + 0x44 * 3,
];

const controllerValues = [
	{ offset: 0x00, type: ByteSize.U32, name: ControllerInputType.ButtonsPressed },
	{ offset: 0x04, type: ByteSize.U32, name: ControllerInputType.ButtonsPressedPrevious },
	{ offset: 0x08, type: ByteSize.U32, name: ControllerInputType.ButtonsPressedInstant },
	{ offset: 0x10, type: ByteSize.U32, name: ControllerInputType.ButtonsReleased },
	{ offset: 0x1c, type: ByteSize.U8, name: ControllerInputType.AnalogByteL },
	{ offset: 0x1d, type: ByteSize.U8, name: ControllerInputType.AnalogByteR },
	{ offset: 0x20, type: ByteSize.U32, name: ControllerInputType.AnalogJoystickX },
	{ offset: 0x24, type: ByteSize.U32, name: ControllerInputType.AnalogJoystickY },
	{ offset: 0x28, type: ByteSize.U32, name: ControllerInputType.AnalogCStickX },
	{ offset: 0x2c, type: ByteSize.U32, name: ControllerInputType.AnalogCStickY },
	{ offset: 0x30, type: ByteSize.U32, name: ControllerInputType.AnalogL },
	{ offset: 0x34, type: ByteSize.U32, name: ControllerInputType.AnalogR },
	{ offset: 0x41, type: ByteSize.U8, name: ControllerInputType.IsPlugged },
];

export type ControllerInputs = {
	[option in ControllerInputType]: number;
} & {
	controllerIndex: number;
};

export const getControllerInputs = (memory: DolphinMemory): ControllerInputs[] => {
	const controllerInputs: ControllerInputs[] = controllers.map((controller, i) => {
		const playerController = {
			...controllerValues.reduce((input: ControllerInputs, { offset, type, name }) => {
				input[name] = memory.read(controller + offset, type);
				return input;
			}, {} as ControllerInputs),
			controllerIndex: i,
		};
		return playerController;
	});

	return controllerInputs;
};
