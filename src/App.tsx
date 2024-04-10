import { Editor, Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useRef, useState } from "react";
import { Pane } from "split-pane-react";
import SplitPane from "split-pane-react/esm/SplitPane";
import { Button } from "./components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Badge } from "./components/ui/badge";
import { cn } from "./lib/utils";

interface IEditorConfig {
  fontSize: number;
  tabSize: number;
}

function App() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  function handleEditorDidMount(
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) {
    console.log(editor, monaco);
    editorRef.current = editor;
  }

  function showValue() {
    console.log(editorRef.current);
    editorRef?.current?.getAction("editor.action.formatDocument")?.run();
  }

  const [editorConfig, setEditorConfig] = useState<IEditorConfig>({
    fontSize: 16,
    tabSize: 2,
  });
  const [sizes, setSizes] = useState([200, 500]);
  const [isValid, setIsValid] = useState(true);

  return (
    <div className="py-4 h-screen">
      <div className="flex flex-1 justify-between px-4 pb-6 border-b-[1px] border-[#2a2d2e]">
        <div className="flex flex-row items-end">
          <Badge
            variant="default"
            className={cn(isValid ? "bg-green-600" : "bg-destructive")}
          >
            {isValid ? "Valid JSON" : "Invalid JSON"}
          </Badge>
        </div>
        <div className="flex flex-row items-end gap-2">
          <div className="flex flex-col gap-2">
            <span className="text-background text-sm">Font Size</span>
            <Select
              defaultValue={editorConfig?.fontSize?.toString()}
              onValueChange={(val) =>
                setEditorConfig((prev) => ({
                  ...prev,
                  fontSize: parseInt(val),
                }))
              }
            >
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Font Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[14, 16, 18, 20, 22, 24].map((size) => (
                    <SelectItem value={size.toString()} key={size}>
                      {size.toString()}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-background text-sm">Tab Size</span>
            <Select
              defaultValue={editorConfig?.tabSize?.toString()}
              onValueChange={(val) =>
                setEditorConfig((prev) => ({
                  ...prev,
                  tabSize: parseInt(val),
                }))
              }
            >
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Tab Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[2, 4].map((size) => (
                    <SelectItem value={size.toString()} key={size}>
                      {size.toString()}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={showValue}>Prettify</Button>
        </div>
      </div>
      <SplitPane
        split="vertical"
        sizes={sizes}
        onChange={setSizes}
        resizerSize={0}
        sashRender={() => (
          <div className="border-[#2a2d2e] border-[1px] h-full"></div>
        )}
      >
        <Pane minSize="30%" maxSize="50%">
          <Editor
            // height="90vh"
            defaultLanguage="json"
            theme="vs-dark"
            options={{
              ...editorConfig,
              stickyScroll: {
                enabled: false,
              },
              minimap: {
                enabled: false,
              },
              automaticLayout: true,
            }}
            onMount={handleEditorDidMount}
            onValidate={(errors) => {
              setIsValid(errors.length === 0);
            }}
          />
        </Pane>
        <div className="flex flex-1 px-4">
          {/* <div className="h-24 w-full bg-accent">tes</div> */}
        </div>
      </SplitPane>
    </div>
  );
}

export default App;
