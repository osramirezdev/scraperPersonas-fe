import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '../../pages/layout/layout'
import NotFound from '../../pages/not-found/not-found'
import Ruc from '../../pages/ruc/ruc'
import Ips from '../../pages/ips/ips'
import Docentes from '../../pages/docentes/docentes'
import Funcionarios from '../../pages/funcionarios/funcionarios'

const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" Component={AppLayout} >
        <Route path="/" element={<Navigate to="/ruc" />} />
        <Route path="/ruc" index element={<Ruc />} />
        <Route path="/ips" index element={<Ips />} />
        <Route path="/docente" index element={<Docentes />} />
        <Route path="/funcionario" index element={<Funcionarios />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default Router
