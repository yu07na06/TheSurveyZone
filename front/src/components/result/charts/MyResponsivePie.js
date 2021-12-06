// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import { ResponsivePie } from '@nivo/pie'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsivePie = ({ data /* see data tab */ }) => (
    <>
    <ResponsivePie
         data={data}
         margin={{ top: 30, right: 20, bottom: 30, left: 20 }}
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
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 20,
                itemsSpacing: 5,
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