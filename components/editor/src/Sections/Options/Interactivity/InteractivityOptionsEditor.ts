import { type Container, type IInteractivity, InteractivityDetect } from "@tsparticles/engine";
import { type EditorGroup, EditorType } from "object-gui";
import { EditorBase } from "../../../EditorBase";
import { EventsOptionsEditor } from "./Events/EventsOptionsEditor";
import { ModesOptionsEditor } from "./Modes/ModesOptionsEditor";

export class InteractivityOptionsEditor extends EditorBase {
    group!: EditorGroup;
    private options!: () => IInteractivity;

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(particles: () => Container) {
        super(particles);
    }

    addToGroup(parent: EditorGroup): void {
        this.group = parent.addGroup("interactivity", "Interactivity");
        this.options = this.group.data as () => IInteractivity;

        this.addEvents();
        this.addModes();

        this.addProperties();
    }

    private addEvents(): void {
        const options = new EventsOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addModes(): void {
        const options = new ModesOptionsEditor(this.particles);

        options.addToGroup(this.group);
    }

    private addProperties(): void {
        this.group
            .addProperty("detectsOn", "Detects On", EditorType.select)
            .change(() => {
                void this.particles().refresh();
            })
            .addItems([
                {
                    value: InteractivityDetect.canvas,
                },
                {
                    value: InteractivityDetect.parent,
                },
                {
                    value: InteractivityDetect.window,
                },
            ]);
    }
}
