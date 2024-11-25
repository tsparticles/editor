import { type Container, type IHoverEvent } from "@tsparticles/engine";
import { type EditorGroup, EditorType } from "object-gui";
import { EditorBase } from "../../../../EditorBase";

export class HoverEventsOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => IHoverEvent;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("onHover", "Hover Events");
        this.options = this.group.data as () => IHoverEvent;

        this.addParallax();
        this.addProperties();
    }

    private addParallax(): void {
        const parallax = this.group.addGroup("parallax", "Parallax");

        parallax.addProperty("enable", "Enable", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });

        parallax.addProperty("force", "Force", EditorType.number).change(() => {
            void this.particles().refresh();
        });

        parallax.addProperty("smooth", "Smooth", EditorType.number).change(() => {
            void this.particles().refresh();
        });
    }

    private addProperties(): void {
        this.group.addProperty("enable", "Enable", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });

        this.group
            .addProperty("mode", "Mode", EditorType.select)
            .change(() => {
                void this.particles().refresh();
            })
            .addItems([
                {
                    value: "attract",
                },
                {
                    value: "bubble",
                },
                {
                    value: "connect",
                },
                {
                    value: "grab",
                },
                {
                    value: "light",
                },
                {
                    value: "repulse",
                },
                {
                    value: "slow",
                },
                {
                    value: "trail",
                },
            ]);
    }
}
