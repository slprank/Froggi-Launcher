import DolphinMemory from 'dolphin-memory-reader';
import { ByteSize } from 'dolphin-memory-reader/dist/types/enum';
import {
	ControllerInputs,
	PlayerController,
} from '../../../frontend/src/lib/models/types/controller';

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
	{ offset: 0x20, type: ByteSize.U32Float, name: ControllerInputType.AnalogJoystickX },
	{ offset: 0x24, type: ByteSize.U32Float, name: ControllerInputType.AnalogJoystickY },
	{ offset: 0x28, type: ByteSize.U32Float, name: ControllerInputType.AnalogCStickX },
	{ offset: 0x2c, type: ByteSize.U32Float, name: ControllerInputType.AnalogCStickY },
	{ offset: 0x30, type: ByteSize.U32Float, name: ControllerInputType.AnalogL },
	{ offset: 0x34, type: ByteSize.U32Float, name: ControllerInputType.AnalogR },
	{ offset: 0x41, type: ByteSize.U8, name: ControllerInputType.IsPlugged },
];

export const getControllerInputs = (memory: DolphinMemory): PlayerController => {
	const controllerInputs: PlayerController = controllers.reduce(
		(playerController: PlayerController, controller: number, i: number) => {
			playerController[i] = {
				...controllerValues.reduce((input: ControllerInputs, { offset, type, name }) => {
					input[name] = memory.read(controller + offset, type);
					return input;
				}, {} as ControllerInputs),
			};
			return playerController;
		},
		{} as PlayerController,
	);
	return controllerInputs;
};
