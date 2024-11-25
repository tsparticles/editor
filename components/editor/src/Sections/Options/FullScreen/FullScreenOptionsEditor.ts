import type { Container, IFullScreen } from "@tsparticles/engine";
import { type EditorGroup, EditorType } from "object-gui";
import { EditorBase } from "../../../EditorBase";

export class FullScreenOptionsEditor extends EditorBase {
    private group!: EditorGroup;
    private options!: () => IFullScreen;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("fullScreen", "Full Screen");
        this.options = this.group.data as () => IFullScreen;

        this.addProperties();
    }

    private addProperties(): void {
        this.group.addProperty("enable", "Enable", EditorType.boolean).change(() => {
            void this.particles().refresh();
        });

        this.group.addProperty("zIndex", "zIndex", EditorType.number).change(() => {
            void this.particles().refresh();
        });
    }
}
