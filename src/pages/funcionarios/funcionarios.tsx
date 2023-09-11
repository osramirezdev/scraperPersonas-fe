import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from "react-highlight-words";
import { Breadcrumb, Button, Input, InputRef, Layout, Modal, Select, Space, TableColumnsType } from 'antd';
import "./funcionarios-styles.css";
import axios, { AxiosResponse } from 'axios';
import Table, { ColumnType, ColumnsType } from 'antd/es/table';
import { FilterConfirmProps } from 'antd/es/table/interface';
import { ColumnDataType, AsignacionFuncionariosModel, SearchFuncionarioDto, FuncionarioModel } from '../../domains';
import { BASE_URL, meses } from '../../constants/constants';
const { Content } = Layout;


const Funcionarios: React.FC = () => {
  const currentMonth: string = (new Date().getMonth() + 1).toString();
  const [loading, setLoading] = useState<boolean>(false);
  const [year, setYear] = useState<string>("2023");
  const [month, setMonth] = useState<string>(meses.find((f) => f.value == currentMonth)?.label || "Enero");
  const [data, setData] = useState<FuncionarioModel[]>([]);
  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, [year, month, data]);

  const searchDto: SearchFuncionarioDto[] = [];

  type DataIndex = keyof ColumnDataType<FuncionarioModel>["data"];
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleChangeSelectYear = (value: string) => {
    setYear(value);
    searchDto[0].anho = value;
  };

  const handleChangeSelectMonth = (value: string) => {
    setMonth(meses.find((f) => f.value == value)!.label);
  };

  const handleSearch = async (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    // Regex:
    // remplazo todo lo que empieze con ", " s es espacio en blanco y el ? indica que es opcional el espacio en blanco
    // 
    let cedulas = selectedKeys[0].replace(/^,\s?(.*)/, "").split(/\,\s|\,/);
    for (let ced of cedulas) {
      searchDto.push({
        anho: year,
        nombre_mes: month.toLocaleLowerCase(),
        numero_mes: meses.find((f) => f.label == month)!.value,
        documento: ced
      });
    }
    await handleButtonClick();
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const handleButtonClick = async () => {
    setLoading(true);
    const url = `${BASE_URL}/api/v1/scraper/obtener/funcionarios/`;
    try {
      let payload: {
        search: SearchFuncionarioDto[]
      } = {
        search: searchDto
      }
      const response = await axios.post<AxiosResponse<FuncionarioModel[]>>(url, payload);
      setLoading(false);
      if (response.data.data != null || response.data.data != undefined) {
        for (let d of response.data.data) {
          Object.assign(d, { key: d.id })
          for(let c of d.asignaciones || []) {
            Object.assign(c, { key: c.id })
          };
        };
        setData(response.data.data);
      }
      setSearchText('');
    } catch (err) {
      setLoading(false);
      console.error("Error:", err);
      error();
    }
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<ColumnDataType<FuncionarioModel>["data"]> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Ej: 3512891, 4258632`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Cerrar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const getColumnSelectProps = (dataIndex: DataIndex, tipo: string = "year"): ColumnType<ColumnDataType<FuncionarioModel>["data"]> => ({
    filterDropdown: () => (
      tipo == "year" ?
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Select
            defaultValue="2023"
            style={{ width: 120 }}
            onChange={handleChangeSelectYear}
            options={[
              { value: '2023', label: '2023' },
              { value: '2022', label: '2022' },
              { value: '2021', label: '2021' },
              { value: '2020', label: '2020' },
              { value: '2019', label: '2019' },
              { value: '2018', label: '2018' },
              { value: '2017', label: '2017' },
              { value: '2016', label: '2016' },
              { value: '2015', label: '2015' },
              { value: '2014', label: '2014' },
            ]}
          />
        </div> :
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Select
            defaultValue={currentMonth}
            style={{ width: 120 }}
            onChange={handleChangeSelectMonth}
            options={meses}
          />
        </div>
    ),
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  // instancio para crear mi tabla
  let columnas: ColumnsType<ColumnDataType<FuncionarioModel>["data"]> = [];
  let obj: FuncionarioModel = new FuncionarioModel()
  obj.getAtributos(["id", "created_at", "updated_at", "deleted_at", "asignaciones"]).forEach((key, index) => {
    let k: any = key;
    columnas.push({
      title: key,
      dataIndex: key.toLowerCase().replace(/\s/g, "_"),
      key: "id",
      width: key.length >= 15 ? '30%' : '10%',
    });
    if (key == "id") {
      Object.assign(columnas[index], { key: 'id' })
    };
    if (key == "Documento") {
      Object.assign(columnas[index], { ...getColumnSearchProps(k) })
    };
    if (key == "Anho") {
      Object.assign(columnas[index], { title: `Año: ${year}`, ...getColumnSelectProps(k) })
    };
    if (key == "Mes") {
      Object.assign(columnas[index], { title: `Mes: ${month}`, ...getColumnSelectProps(k, "Month") })
    };
  });


  const expandedRowRender = (record: FuncionarioModel) => {
    const columnsAsignaciones: TableColumnsType<ColumnDataType<AsignacionFuncionariosModel>["data"]> = [];
    let obj: AsignacionFuncionariosModel = new AsignacionFuncionariosModel()
    obj.getAtributos(["created_at", "updated_at", "deleted_at", "id", "movimiento", "lugar", "motivo_movimiento", "estado"]).forEach((key) => {
      columnsAsignaciones.push({
        title: key,
        dataIndex: key.toLowerCase().replace(/\s/g, "_"),
        key: "id",
        width: '20%',
      });
    });
    return <Table columns={columnsAsignaciones} dataSource={record?.asignaciones} pagination={false} />;
  };

  const error = () => {
    Modal.error({
      title: 'Hubo un error',
      content: 'Por favor intentelo de nuevo.',
    });
  };
  return (
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Separator>Buscador</Breadcrumb.Separator>
        <Breadcrumb.Separator>Funcionarios</Breadcrumb.Separator>
      </Breadcrumb>
      <Table
        columns={columnas}
        dataSource={data}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        scroll={{ x: 1500 }}
        loading={loading} />
    </Content>
  );
};

export default Funcionarios;