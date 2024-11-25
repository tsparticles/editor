import { type Container, RotateDirection } from "@tsparticles/engine";
import { type EditorGroup, EditorType } from "object-gui";
import { EditorBase } from "../../../../EditorBase";

export class RotateOptionsEditor extends EditorBase {
    group!: EditorGroup;

    private options!: () => unknown;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("rotate", "Rotate");
        this.options = this.group.data as () => unknown;

        this.addAnimation();
        this.addProperties();
    }

    private addAnimation(): void {
        const group = this.group.addGroup("animation", "Animation");

        group.addProperty("enable", "Enable", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("speed", "Speed", EditorType.number).change(() => {
            void this.particles().refresh();
        });

        group.addProperty("sync", "Sync", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });
    }

    private addProperties(): void {
        this.group
            .addProperty("direction", "Direction", EditorType.select)
            .change(() => {
                void this.particles().refresh();
            })
            .addItems([
                {
                    value: RotateDirection.clockwise,
                },
                {
                    value: RotateDirection.counterClockwise,
                },
                {
                    value: RotateDirection.random,
                },
            ]);

        this.group.addProperty("path", "Path", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });

        this.group.addProperty("random", "Random", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });

        this.group.addProperty("value", "Value", EditorType.number).change(() => {
            void this.particles().refresh();
        });
    }
}
