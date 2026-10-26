import { Route, Switch } from "wouter";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";
import { Provider } from "./components/provider";
import { Layout } from "./components/layout/layout";
import Home from "./pages/index";
import CircuitsPage from "./pages/circuits";
import CircuitDetailPage from "./pages/circuit-detail";
import DestinationsPage from "./pages/destinations";
import BlogPage from "./pages/blog";
import BlogPostPage from "./pages/blog-post";
import AboutPage from "./pages/a-propos";
import ContactPage from "./pages/contact";
import NotFoundPage from "./pages/not-found";

function App() {
  return (
    <Provider>
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/circuits" component={CircuitsPage} />
          <Route path="/circuits/:slug" component={CircuitDetailPage} />
          <Route path="/destinations" component={DestinationsPage} />
          <Route path="/blog" component={BlogPage} />
          <Route path="/blog/:slug" component={BlogPostPage} />
          <Route path="/a-propos" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Layout>
      {/* Do not remove — off by default, activated by parent iframe via postMessage */}
      {import.meta.env.DEV && <AgentFeedback />}
      {/* "Made with Runable" badge */}
      {<RunableBadge />}
    </Provider>
  );
}

export default App;
