import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from "react-highlight-words";
import { Breadcrumb, Button, Input, InputRef, Layout, Modal, Space, TableColumnsType } from 'antd';
import "./ips-styles.css";
import axios, { AxiosResponse } from 'axios';
import Table, { ColumnType, ColumnsType } from 'antd/es/table';
import { FilterConfirmProps } from 'antd/es/table/interface';
import { ColumnDataType, EmpleadoresModel, IpsDto, IpsModel } from '../../domains';
import { BASE_URL } from '../../constants/constants';
const { Content } = Layout;


const Ips: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IpsModel[]>([]);
  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, [data]);

  const ipsDto: IpsDto = {
    documentos: [],
  };

  type DataIndex = keyof ColumnDataType<IpsModel>["data"];
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = async (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    ipsDto.documentos = selectedKeys[0].replace(/^,\s?(.*)/, "").split(/\,\s|\,/);
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
    const url = `${BASE_URL}/api/v1/scraper/obtener/ips/`;

    try {
      const response = await axios.post<AxiosResponse<IpsModel[]>>(url, ipsDto);
      setLoading(false);
      if (response.data.data != null || response.data.data != undefined) {
        for (let d of response.data.data) {
          Object.assign(d, { key: d.documento })
          for(let c of d.empleadores || []) {
            Object.assign(c, { key: c.patronal })
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

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<ColumnDataType<IpsModel>["data"]> => ({
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

  // instancio para crear mi tabla
  let columnas: ColumnsType<ColumnDataType<IpsModel>["data"]> = [];
  let obj2: IpsModel = new IpsModel()
  obj2.getAtributos(["id", "created_at", "updated_at", "deleted_at", "empleadores"]).map((key, index) => {
    let k: any = key;
    columnas.push({
      title: key,
      dataIndex: key.toLowerCase().replace(/\s/g, "_"),
      key: "Documento",
      width: key.length >= 15 ? '30%' : '10%',
    });
    if (key == "Documento") {
      Object.assign(columnas[index], { key: "documento", ...getColumnSearchProps(k) })
    };
  });

  const expandedRowRender = (record: IpsModel) => {
    const columnsEmpleadores: TableColumnsType<ColumnDataType<EmpleadoresModel>["data"]> = [];
    let obj: EmpleadoresModel = new EmpleadoresModel()
    obj.getAtributos(["id", "created_at", "updated_at", "deleted_at"]).forEach((key) => {
      columnsEmpleadores.push({
        title: key,
        dataIndex: key.toLowerCase().replace(/\s/g, "_"),
        key: "patronal",
        width: '20%',
      });
    });
    return <Table columns={columnsEmpleadores} dataSource={record.empleadores} pagination={false} />;
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
        <Breadcrumb.Separator>Ips</Breadcrumb.Separator>
      </Breadcrumb>
      <Table
        columns={columnas}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        dataSource={data}
        loading={loading} />
    </Content>
  );
};

export default Ips;