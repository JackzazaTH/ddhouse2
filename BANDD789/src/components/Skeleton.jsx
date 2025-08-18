export default function Skeleton({ h=14, w='100%' }){
  return <div style={{height:h, width:w, background:'linear-gradient(90deg,#eee,#f6f6f6,#eee)', backgroundSize:'200% 100%', animation:'s 1.2s infinite', borderRadius:8}}/>
}
