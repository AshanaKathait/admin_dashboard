
import { CalendarOutlined } from '@ant-design/icons'
import { Badge, Card, List } from 'antd'
import React, { useState } from 'react'
import { Text } from '../text';
import UpcomingEventsSkeleton from '../skeleton/skeleton/upcoming-events';
import { getDate } from '@/utilities/helpers';
import { useList } from '@refinedev/core';
import { DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY } from '@/graphql/queries';
import dayjs from 'dayjs';

const UpcomingEvents = () => {
    const [isLoading, setLoading] = useState(false);

    const {data, isLoading: eventsLoading} = useList({
        resource: 'events',
        pagination: {pageSize: 5},
        sorters: [
            {
                field: 'startDate',
                order: 'asc'
            }
        ],
        meta: {
            gqlQuery: DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY
        },
        filters: [
            {
                field: 'startDate',
                operator: 'gte',
                value: dayjs('2024-01-01').format('YYYY-MM-DD')
            }
        ] 
    });

  return (
    <Card
    style={{height: '100%'}}
    headStyle={{padding: '8px 16px'}}
    bodyStyle={{padding: '0 1rem'}}
    title = {
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
        }}>
            <CalendarOutlined/>
            <Text size= "sm" style={{marginLeft: "0.7rem"}}>
                Upcoming Events
            </Text>
        </div>
    }
    >
        {isLoading ? (
            <List
            itemLayout='horizontal'
            dataSource={Array.from({length: 5}).map((_, index) =>({
                id: index,
            }))}
            renderItem={() => <UpcomingEventsSkeleton/>}
            />
        ) : (
            <List
              itemLayout='horizontal'
              dataSource={data?.data || []}
              renderItem={(item)=>{
                const renderDate = getDate(item.startDate, item.endDate)
                return (
                    <List.Item>
                        <List.Item.Meta
                        avatar={<Badge color={item.color}/>}
                        title = {<Text size="xs">{renderDate}</Text>}
                        description={<Text ellipsis={{tooltip: true}}
                        strong>
                            {item.title}
                        </Text>}
                        />
                    </List.Item>
                )
              }}

            />
        )}
         {!isLoading && data?.data.length ===0 && (
                <span
                style = {{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '220px'
                }}
                >
                    No Upcoming Events
                    </span>
              )}

        </Card>
  )

}

export default UpcomingEvents
