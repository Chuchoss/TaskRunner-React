import "normalize.css";
import "./scss/main.scss";
import React from "react";
import Header from "./components/Header/Header";
import { Layout } from "./components/Layout/Layout";
import { Content } from "./components/Content/Content";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import StatisticPage from "./pages/StatisticPage/StatisticPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";

export default function App() {
  return (
    <>
      <Layout>
        <Header />
        <Content>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/statistic' element={<StatisticPage />} />
            <Route path='/settings' element={<SettingsPage />} />
            <Route
              path='*'
              element={
                <main style={{ padding: "1rem", textAlign: "center" }}>
                  <p>Ошибка 404! Ничего не найдено.</p>
                </main>
              }
            ></Route>
          </Routes>
        </Content>
      </Layout>
    </>
  );
}
