import { type Container, DestroyType, type IOpacity, StartValueType } from "@tsparticles/engine";
import { type EditorGroup, EditorType } from "object-gui";
import { EditorBase } from "../../../../EditorBase";

export class OpacityOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => IOpacity;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup, options?: () => unknown): void {
        this.group = parent.addGroup("opacity", "Opacity", true, options);
        this.options = this.group.data as () => IOpacity;

        this.addAnimation();
        this.addRandom();
        this.addProperties();
    }

    private addAnimation(): void {
        const group = this.group.addGroup("animation", "Animation");

        group
            .addProperty("destroy", "Destroy", EditorType.select)
            .change(() => {
                void this.particles().refresh();
            })
            .addItems([
                {
                    value: DestroyType.max,
                },
                {
                    value: DestroyType.min,
                },
                {
                    value: DestroyType.none,
                },
            ]);

        group.addProperty("enable", "Enable", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });

        group
            .addProperty("minimumValue", "Minimum Value", EditorType.number)
            .change(() => {
                void this.particles().refresh();
            })
            .min(0)
            .max(0)
            .step(0.01);

        group
            .addProperty("speed", "Speed", EditorType.number)
            .change(() => {
                void this.particles().refresh();
            })
            .step(0.01);

        group
            .addProperty("startValue", "Start Value", EditorType.select)
            .change(() => {
                void this.particles().refresh();
            })
            .addItems([
                {
                    value: StartValueType.max,
                },
                {
                    value: StartValueType.min,
                },
                {
                    value: StartValueType.random,
                },
            ]);

        group.addProperty("sync", "Sync", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });
    }

    private addProperties(): void {
        this.group
            .addProperty("value", "Value", EditorType.number)
            .change(() => {
                void this.particles().refresh();
            })
            .min(0)
            .max(1)
            .step(0.01);
    }

    private addRandom(): void {
        const group = this.group.addGroup("random", "Random");

        group.addProperty("enable", "Enable", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("minimumValue", "Minimum Value", EditorType.number).change(() => {
            void this.particles().refresh();
        });
    }
}
