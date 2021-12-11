import { ResponsivePie } from '@nivo/pie'

const MyResponsivePie = ({ data }) => (
    <>
    <ResponsivePie
         data={data}
         margin={{ top: 10, right: 15, bottom: 10, left: 0 }}
         innerRadius={0.5}
         padAngle={0.7}
         cornerRadius={3}
         activeOuterRadiusOffset={10}
         colors={{ scheme: 'pastel1' }}
         borderWidth={1}
         borderColor={{ from: 'color', modifiers: [ [ 'brighter', 0.2 ] ] }}
         enableArcLinkLabels={false}
         arcLinkLabelsSkipAngle={10}
         arcLinkLabelsTextColor="#333333"
         arcLinkLabelsThickness={2}
         arcLinkLabelsColor={{ from: 'color' }}
         arcLabel={function(e){return e.id+" ("+e.value+")"}}
         arcLabelsSkipAngle={10}
         arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', 2 ] ] }}
        legends={[
            {
                anchor: 'top-right',
                direction: 'column',
                justify: false,
                translateX: 10,
                translateY: 0,
                itemsSpacing: 5,
                itemWidth: 100,
                itemHeight: 20,
                symbolSize: 13,
                itemTextColor: '#999',
                itemDirection: 'right-to-left',
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
    </>
)
export default MyResponsivePie;