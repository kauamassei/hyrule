import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Games from "./pages/Games";
import GameDetail from "./pages/GameDetail";
import Characters from "./pages/Characters";
import Story from "./pages/Story";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="games" element={<Games />} />
        <Route path="games/:slug" element={<GameDetail />} />
        <Route path="characters" element={<Characters />} />
        <Route path="story" element={<Story />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
