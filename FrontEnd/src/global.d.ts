type PromptResponse = Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
}>;

export interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: PromptResponse;
    prompt(): PromptResponse;
}
declare global {
    export interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent;
    }
}
