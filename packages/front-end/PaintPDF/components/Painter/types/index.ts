export type ExternalAssetURL = "" | `http://${string}` | `https://${string}`;

export type ExternalAssetStore = {
	upload(id: string, type: string, file: File): Promise<ExternalAssetURL>;
	resolve(id: string, type: string, url: ExternalAssetURL): ExternalAssetURL | Promise<ExternalAssetURL>;
};
