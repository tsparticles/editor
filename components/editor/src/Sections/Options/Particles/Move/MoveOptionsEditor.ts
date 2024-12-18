import { type Container, type IMove, type IMoveTrail, MoveDirection, OutMode } from "@tsparticles/engine";
import { type EditorGroup, EditorType } from "object-gui";
import { EditorBase } from "../../../../EditorBase";

export class MoveOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => IMove;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("move", "Move");
        this.options = this.group.data as () => IMove;

        this.addAngle();
        this.addAttract();
        this.addDistance();
        this.addGravity();
        this.addOutModes();
        this.addPath();
        this.addTrail();
        this.addProperties();
    }

    private addAngle(): void {
        const group = this.group.addGroup("angle", "Angle");

        group.addProperty("offset", "Offset", EditorType.number).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("value", "Value", EditorType.number).change(() => {
            void this.particles().refresh();
        });
    }

    private addAttract(): void {
        const group = this.group.addGroup("attract", "Attract");

        const rotateGroup = group.addGroup("rotate", "Rotate", false);

        rotateGroup.addProperty("x", "X", EditorType.number).change(() => {
            void this.particles().refresh();
        });

        rotateGroup.addProperty("y", "Y", EditorType.number).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("enable", "Enable", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });
    }

    private addDistance(): void {
        const group = this.group.addGroup("distance", "Distance");

        group.addProperty("horizontal", "Horizontal", EditorType.number).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("vertical", "Vertical", EditorType.number).change(() => {
            void this.particles().refresh();
        });
    }

    private addGravity(): void {
        const group = this.group.addGroup("gravity", "Gravity");

        group.addProperty("acceleration", "Acceleration", EditorType.number).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("enable", "Enable", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("maxSpeed", "Max Speed", EditorType.number).change(() => {
            void this.particles().refresh();
        });
    }

    private addOutModes(): void {
        const group = this.group.addGroup("outModes", "Out Modes");

        const outModesValues = [
            {
                value: OutMode.bounce,
            },
            {
                value: OutMode.destroy,
            },
            {
                value: OutMode.none,
            },
            {
                value: OutMode.split,
            },
            {
                value: OutMode.out,
            },
        ];

        group
            .addProperty("bottom", "Bottom", EditorType.select)
            .change(() => {
                void this.particles().refresh();
            })
            .addItems(outModesValues);

        group
            .addProperty("default", "Default", EditorType.select)
            .change(() => {
                void this.particles().refresh();
            })
            .addItems(outModesValues);

        group
            .addProperty("left", "Left", EditorType.select)
            .change(() => {
                void this.particles().refresh();
            })
            .addItems(outModesValues);

        group
            .addProperty("right", "Right", EditorType.select)
            .change(() => {
                void this.particles().refresh();
            })
            .addItems(outModesValues);

        group
            .addProperty("top", "Top", EditorType.select)
            .change(() => {
                void this.particles().refresh();
            })
            .addItems(outModesValues);
    }

    private addPath(): void {
        const group = this.group.addGroup("path", "Path");
        const delayGroup = group.addGroup("delay", "Delay");

        delayGroup.addProperty("value", "value", EditorType.number).change(() => {
            void this.particles().refresh();
        });

        const randomGroup = delayGroup.addGroup("random", "Random");

        randomGroup.addProperty("enable", "Enable", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });

        randomGroup.addProperty("minimumValue", "Minimum Value", EditorType.number).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("clamp", "Clamp", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("enable", "Enable", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("generator", "Generator", EditorType.string).change(() => {
            void this.particles().refresh();
        });
    }

    private addProperties(): void {
        const group = this.group;

        group
            .addProperty("direction", "Direction", EditorType.select)
            .change(() => {
                void this.particles().refresh();
            })
            .addItems([
                {
                    value: MoveDirection.bottom,
                },
                {
                    value: MoveDirection.bottomLeft,
                },
                {
                    value: MoveDirection.bottomRight,
                },
                {
                    value: MoveDirection.left,
                },
                {
                    value: MoveDirection.none,
                },
                {
                    value: MoveDirection.right,
                },
                {
                    value: MoveDirection.top,
                },
                {
                    value: MoveDirection.topLeft,
                },
                {
                    value: MoveDirection.topRight,
                },
            ]);

        group.addProperty("drift", "Drift", EditorType.number).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("enable", "Enable", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("random", "Random", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("size", "Size", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("speed", "Speed", EditorType.number).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("straight", "Straight", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("vibrate", "Vibrate", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("warp", "Warp", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });
    }

    private addTrail(): void {
        const group = this.group.addGroup("trail", "Trail");
        const optionsFunc = group.data as () => IMoveTrail;
        const options = optionsFunc();
        const color = typeof options.fill?.color === "string" ? options.fill.color : options.fill?.color?.value;

        const fillGroup = group.addGroup("fill", "Fill");

        fillGroup.addProperty("color", "Color", EditorType.color, color, false).change((value: unknown) => {
            const options = optionsFunc();

            if (typeof value === "string") {
                if (typeof options.fill.color === "string") {
                    options.fill.color = value;
                } else {
                    if (options.fill.color === undefined) {
                        options.fill.color = {
                            value: value,
                        };
                    } else {
                        options.fill.color.value = value;
                    }
                }
            }

            void this.particles().refresh();
        });

        group.addProperty("enable", "Enable", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("length", "Length", EditorType.number).change(() => {
            void this.particles().refresh();
        });
    }
}
