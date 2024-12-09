import { Route } from "wouter";
import PDFLoaderPage from "./pages/PDFLoader";
import WikiUploadPage from "./pages/WikiUpload";
import Archium2WikiPage from "./pages/Archium2Wiki";

const WebRouter: React.FC = () => (
  <div>
    <Route path="/" component={PDFLoaderPage} />
    <Route path="/wiki-upload" component={WikiUploadPage} />
    <Route path="/archium-2-wiki" component={Archium2WikiPage} />
  </div>
);

export default WebRouter;
