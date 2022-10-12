import { Avatar, Button, List, Skeleton ,Collapse } from 'antd';
import React, { useEffect, useState } from 'react';
import {subgraphQuery} from '../utils/index';
import {FETCH_REPORTS} from '../queries/index';

import {
    ClockCircleOutlined,
    CheckCircleFilled,
    CloseCircleFilled
  } from '@ant-design/icons';

const count = 1;
const History : React.FC = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [list, setList] = useState<any[]>([]);
  const [reports, setReports] = useState([]);
    const getData = async (count :number) => {
        const data = await subgraphQuery(FETCH_REPORTS(count,"0x04c755E1574F33B6C0747Be92DfE1f3277FCC0A9"));
        setData(data.reports);
        setList(data.reports);
    }
    useEffect(() => {
        getData(count);
        setInitLoading(false);
    }, [])
  

  const onLoadMore = async () => {
    setLoading(true);
    await getData(count+1);
    setLoading(false);
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;
  const { Panel } = Collapse

  const renderStatus = (status: string) => {
    if (status === null) {
      return <ClockCircleOutlined style={{color:"orange"}}/>
    }
    else if(status === 'ACCEPTED') {
      return <CheckCircleFilled style={{color:"green"}}/>
    }
    else {
      return <CloseCircleFilled style={{color:"red"}}/>
    }
  }

  const statusText = (status: string,address: string) => {
    if (status === null) {
      return "Open"
    }
    else if(status === 'ACCEPTED') {
      return "Aproved by "+address.slice(0,6)+"..."+address.slice(-4)
    }
    else {
      return "Rejected by "+address.slice(0,6)+"..."+address.slice(-4)
    }
  }

  

  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      renderItem={item => (
        <Collapse
              bordered={true}
              defaultActiveKey={['0']}
              // expandIcon={({ isActive }) => < rotate={isActive ? 90 : 0} />}
              className="site-collapse-custom-collapse"
              
              style={{ width: '100%' }}
            >
              <Panel header={<div>
                <b style={{fontSize: '15px'}}>{renderStatus(item.status)} {item.domain} - {item.isScam ? "SCAM" : "LEGIT"}</b>
                
              </div>} key="1" className="site-collapse-custom-panel" showArrow={false}>
                <div>
                  <div>
                    <b>Status : </b>
                    {
                      statusText(item.status,item.validator)
                    }
                  </div>
                   
                  <div style={{display:"flex", justifyContent: "space-between"}}>
                    {
                      item.status === null ? <div style={{color:"orange"}}>Stake : 5 MATIC</div> : item.status === 'ACCEPTED' ? <div style={{color:"green"}}>Stake : 5 MATIC</div> : <div style={{color:"red"}}>Stake : 5 MATIC</div>
                    }
                    {
                      item.rewardAmount === null ? <div style={{color:"gray"}}>Reward 0 VIGI</div> : <div style={{color:"orange"}}>Reward : {Number(item.rewardAmount)/1e18} VIGI</div>
                    }
                  </div>
                  <p>Comments : {item.validatorComments}</p>
                  <b>My Report</b>
                  <div>Comments : {item.comments}</div>
                  <div>
                    {
                      item.evidences.split(",").map((evidence: string) => {
                        return <img src={evidence} alt="evidence" style={{width:"100px",height:"100px"}}/>
                      }
                      )
                    }
                    
                  </div>
                </div>
              </Panel>
            </Collapse>
      )}
    />
  );
};

export default History;




