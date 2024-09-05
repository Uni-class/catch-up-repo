import { useMemo, memo } from "react";
import {
	Editor,
	Tldraw,
	TLComponents,
	TLUiOverrides,
	TLUiActionsContextType,
	TLUiToolsContextType,
	TLAssetStore,
	DefaultContextMenu,
	TLUiContextMenuProps,
	TldrawUiMenuGroup,
	ClipboardMenuGroup,
	SelectAllMenuItem,
	DefaultStylePanel,
	TLUiStylePanelProps,
	DefaultStylePanelContent,
	useRelevantStyles,
	DefaultToolbar,
	DefaultToolbarContent,
} from "tldraw";

import "tldraw/tldraw.css";
import "./Painter.css";
import { TLAsset } from "@tldraw/tlschema";
import { ExternalAssetStore, ExternalAssetURL } from "@components/Painter/types";

const PainterComponent = ({
	width = "100%",
	height = "100%",
	readOnly = false,
	externalAssetStore = null,
	onEditorLoad = () => {},
}: {
	width?: number | string;
	height?: number | string;
	readOnly?: boolean;
	externalAssetStore?: ExternalAssetStore | null;
	onEditorLoad?: (editor: Editor) => void;
}) => {
	const CustomContextMenu = memo((props: TLUiContextMenuProps) => {
		return (
			<DefaultContextMenu {...props}>
				<ClipboardMenuGroup />
				<TldrawUiMenuGroup id="select-all">
					<SelectAllMenuItem />
				</TldrawUiMenuGroup>
			</DefaultContextMenu>
		);
	});

	const CustomStylePanel = memo((props: TLUiStylePanelProps) => {
		const styles = useRelevantStyles();
		return (
			<DefaultStylePanel {...props}>
				<DefaultStylePanelContent styles={styles} />
			</DefaultStylePanel>
		);
	});

	const CustomToolbar = memo(() => {
		return (
			<DefaultToolbar>
				<DefaultToolbarContent />
			</DefaultToolbar>
		);
	});

	const components = useMemo<TLComponents>(
		() => ({
			ContextMenu: CustomContextMenu,
			ActionsMenu: null,
			HelpMenu: null,
			ZoomMenu: null,
			MainMenu: null,
			Minimap: null,
			StylePanel: CustomStylePanel,
			PageMenu: null,
			NavigationPanel: null,
			Toolbar: CustomToolbar,
			KeyboardShortcutsDialog: null,
			QuickActions: null,
			HelperButtons: null,
			DebugPanel: null,
			DebugMenu: null,
			SharePanel: null,
			MenuPanel: null,
			TopPanel: null,
			CursorChatBubble: null,
		}),
		[CustomContextMenu, CustomStylePanel, CustomToolbar],
	);

	const keyboardShortcutsEnabledOverrides: TLUiOverrides = {
		actions(_editor, actions): TLUiActionsContextType {
			const shortcuts: { [key: string]: string } = {
				undo: "$z",
				redo: "$!z",
				cut: "$x",
				copy: "$c",
				paste: "$v",
				"select-all": "$a",
				delete: "⌫,del,backspace",
				duplicate: "$d",
			};
			return Object.fromEntries(Object.entries(actions).map(([key, value]) => [key, { ...value, kbd: key in shortcuts ? shortcuts[key] : "" }]));
		},
		tools(_editor, tools): TLUiToolsContextType {
			return Object.fromEntries(Object.entries(tools).map(([key, value]) => [key, { ...value, kbd: "" }]));
		},
	};

	const keyboardShortcutsDisabledOverrides: TLUiOverrides = {
		actions(_editor, actions): TLUiActionsContextType {
			return Object.fromEntries(Object.entries(actions).map(([key, value]) => [key, { ...value, kbd: "" }]));
		},
		tools(_editor, tools): TLUiToolsContextType {
			return Object.fromEntries(Object.entries(tools).map(([key, value]) => [key, { ...value, kbd: "" }]));
		},
	};

	const assetStore: TLAssetStore | undefined = useMemo(() => {
		if (externalAssetStore) {
			return {
				upload(asset: TLAsset, file: File) {
					return externalAssetStore.upload(asset.id, asset.type, file);
				},
				resolve(asset: TLAsset) {
					return externalAssetStore.resolve(asset.id, asset.type, (asset.props.src || "") as ExternalAssetURL);
				},
			};
		} else {
			return undefined;
		}
	}, [externalAssetStore]);

	return (
		<div
			style={{
				width: width,
				height: height,
				pointerEvents: readOnly ? "none" : "unset",
			}}
		>
			<Tldraw
				onMount={onEditorLoad}
				hideUi={readOnly}
				components={components}
				overrides={readOnly ? keyboardShortcutsDisabledOverrides : keyboardShortcutsEnabledOverrides}
				assets={assetStore}
			></Tldraw>
		</div>
	);
};

export const Painter = memo(PainterComponent);
