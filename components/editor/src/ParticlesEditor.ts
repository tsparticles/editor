import { type Container, tsParticles } from "@tsparticles/engine";
import { Editor, EditorType } from "object-gui";
import type { EditorInputBase } from "object-gui/dist/js/Editors/EditorInputBase";
import { OptionsEditor } from "./Sections/Options/OptionsEditor";

export class ParticlesEditor extends Editor {
    readonly particles;
    private _presets?: EditorInputBase;

    constructor(particles: Container) {
        super(particles.id.toString(), "tsParticles", () => particles);

        this.particles = particles;
    }

    addPreset(text: string, file: string): void {
        if (!this._presets) {
            return;
        }

        this._presets.addItem(file, text);
    }

    protected customize(): void {
        super.customize();

        this.addOptions();
        this.addButtons();

        if (Object.keys(tsParticles.configs).length) {
            this.addConfigs();
        }

        this.addPresets();
    }

    private addButtons(): void {
        this.addButton("play", "Play");
        this.addButton("pause", "Pause");
        this.addButton("refresh", "Refresh");
        this.addButton("start", "Start");
        this.addButton("stop", "Stop");
        this.addButton("exportConfig", "Export", false).click(async () => {
            const blob = await this.particles.export("json");

            if (!blob) {
                return;
            }

            const contentType = "application/json",
                url = URL.createObjectURL(blob),
                a = document.createElement("a");

            a.download = "particles.json";
            a.href = url;
            a.dataset.downloadUrl = [contentType, a.download, a.href].join(":");

            const evt = new MouseEvent("click", {
                bubbles: true,
                cancelable: false,
                view: window,
                detail: 0,
                screenX: 0,
                screenY: 0,
                clientX: 0,
                clientY: 0,
                ctrlKey: false,
                altKey: false,
                shiftKey: false,
                metaKey: false,
                button: 0,
                relatedTarget: null,
            });

            a.dispatchEvent(evt);
        });
    }

    private addConfigs(): void {
        const configsEditor = this.addProperty("configs", "Configs", EditorType.select, "", false);

        configsEditor.change(async (value) => {
            try {
                const config = tsParticles.configs[value as string];

                await this.particles.reset();

                this.particles.options.load(config);

                await this.particles.refresh();
            } catch {
                // ignore
            }
        });

        configsEditor.addItems(
            [{ value: "" }, ...Object.keys(tsParticles.configs).map((t) => ({ value: t }))].sort((a, b) =>
                a.value.localeCompare(b.value),
            ),
        );
    }

    private addOptions(): void {
        const options = new OptionsEditor(this.data as () => Container);

        options.addToGroup(this);
    }

    private addPresets(): void {
        this._presets = this.addProperty("preset", "Preset", EditorType.select, "", false);

        this._presets.change(async (value) => {
            try {
                const res = await fetch(value as string);

                if (!res.ok) {
                    return;
                }

                await this.particles.reset();

                this.particles.options.load(await res.json());

                await this.particles.refresh();
            } catch {
                // ignore
            }
        });
    }
}
