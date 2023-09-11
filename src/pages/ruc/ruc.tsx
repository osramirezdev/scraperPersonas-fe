import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from "react-highlight-words";
import { Breadcrumb, Button, Input, InputRef, Layout, Modal, Space } from 'antd';
import "./ruc-styles.css";
import axios, { AxiosResponse } from 'axios';
import Table, { ColumnType, ColumnsType } from 'antd/es/table';
import { FilterConfirmProps } from 'antd/es/table/interface';
import { ColumnDataType, RucDto, RucModel } from '../../domains';
import { BASE_URL } from '../../constants/constants';
const { Content } = Layout;


const Ruc: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<RucModel[]>([]);
  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const rucDto: RucDto = {
    documentos: [],
    nombres: [],
  };

  type DataIndex = keyof ColumnDataType<RucModel>["data"];
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = async (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    dataIndex = dataIndex;
    if (dataIndex.toLocaleLowerCase() == "nombre" || dataIndex.toLocaleLowerCase() == "apellido" || dataIndex.toLocaleLowerCase() == "razon_social") rucDto.nombres = selectedKeys[0].replace(/^,\s?(.*)/, "").split(/\,\s|\,/)
    if (dataIndex.toLocaleLowerCase() == "documento" || dataIndex.toLocaleLowerCase() == "ruc") rucDto.documentos = selectedKeys[0].replace(/^,\s?(.*)/, "").split(/\,\s|\,/)
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
    const url = `${BASE_URL}/api/v1/scraper/obtener/ruc/`;

    try {
      const response = await axios.post<AxiosResponse<RucModel[]>>(url, rucDto);
      setLoading(false);
      const rucs: RucModel[] = [];
      if (response.data.data != null || response.data.data != undefined) {
        for (let r of response.data.data) {
          Object.assign(r, { key: r.documento });
          rucs.push(new RucModel(r));
        }
      }
      setData(rucs);
      setSearchText('');
    } catch (err) {
      setLoading(false);
      console.error("Error:", err);
      error();
    }
  };
  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<ColumnDataType<RucModel>["data"]> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Buscar por ${dataIndex}`}
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
  let columnas: ColumnsType<ColumnDataType<RucModel>["data"]> = [];
  let obj: RucModel = new RucModel()
  obj.getAtributos(["id", "created_at", "updated_at", "deleted_at", "ruc_anterior", "estado"]).forEach((key, index) => {
    let k: any = key;
    columnas.push({
      title: key.split("_").length == 1 ? key.charAt(0).toUpperCase() + key.substring(1).toLowerCase() : key.split("_")[0].charAt(0).toUpperCase() + key.split("_")[0].substring(1).toLowerCase() + " " + key.split("_")[1].charAt(0).toUpperCase() + key.split("_")[1].substring(1).toLowerCase(),
      dataIndex: key.toLowerCase(),
      key: index,
      width: '20%',
      ...getColumnSearchProps(k),
    });
  });

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
        <Breadcrumb.Separator>Ruc</Breadcrumb.Separator>
      </Breadcrumb>
      <Table
        columns={columnas}
        dataSource={data}
        loading={loading} />
    </Content>
  );
};

export default Ruc;