import { Route } from "wouter";
import PDFLoaderPage from "./pages/PDFLoader";
import WikiUploadPage from "./pages/WikiUpload";
import Archium2WikiPage from "./pages/Archium2Wiki";
import HomePage from "./pages/Home";
import FamilySearchProjectsUploadHelper from "./pages/FamilySearchProjectsUploadHelper";

const WebRouter: React.FC = () => (
  <main>
    <Route path="/" component={HomePage} />
    <Route path="/pdf-loader" component={PDFLoaderPage} />
    <Route path="/wiki-upload" component={WikiUploadPage} />
    <Route path="/archium-2-wiki" component={Archium2WikiPage} />
    <Route path="/fs-admin-helper" component={FamilySearchProjectsUploadHelper} />
  </main>
);

export default WebRouter;
