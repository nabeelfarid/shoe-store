import { useEffect } from 'react';
import { Link, NavLink, Outlet, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './App.css';

function App() {

  const location = useLocation();

  console.log("current path: ", location.pathname)
  // console.log("resolved path: ", resolvedPath.pathname)

  return (
    <>
      <nav className={'navigation'}>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="shoes">Shoes</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="shoes" element={<Shoes />} >
          <Route path="/" element={<ShoesList />} />
          <Route path=":id" element={<ShoeDetails />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

const Home = () => {
  return (
    <div className={'container'}>
      <h2>Welcome to our Shoe Store</h2>
    </div>
  )
}

const Shoes = () => {
  return (
    <>
      <Outlet />
    </>
  )
}

const ShoesList = () => {
  return (
    <div className={'container'}>
      <h3>List of Shoes</h3>
      <ul>
        {shoes.map(shoe => {
          return (
            <li key={shoe.id}>
              <Link to={shoe.id.toString()}>{shoe.title}</Link>
            </li>
          )
        })
        }
      </ul>
    </div>
  )
}

const ShoeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const shoe = shoes.find(x => x.id.toString() === id);

  useEffect(() => {
    //if product doesn't exist then redirect to the product list landing page
    if (!shoe) {
      navigate('/shoes')
    }

  }, [shoe, navigate])

  console.log("searchParams:", searchParams.toString())

  if (!shoe) {
    return (
      <div className={'shoe-details-container'}>
        <div>
          <h2>Loading...</h2>
        </div>
      </div>
    )
  }
  return (
    <div className={'shoe-details-container'}>
      <div >
        <h2>{shoe.title}</h2>
        <img src={shoe.img} alt={shoe.title} />
      </div>
      <div>
        <h4>Materials:</h4>
        <ul>
          {shoe.materials.map((m, i) => <li key={i}>{m}</li>)}
        </ul>
      </div>
      <div>
        <h4>Features:</h4>
        <ul>
          {shoe.features.map((m, i) => <li key={i}>{m}</li>)}
        </ul>
      </div>
      <div>
        <h4>Description:</h4>
        <span>{shoe.description}</span>
      </div>

    </div>
  )
}

const NotFound = () => {
  return (
    <div className={'container'}>
      <h3>Oh o! Are you looking for Shoes. Click <Link to="shoes">here</Link> </h3>
    </div>
  )
}

const shoes = [
  {
    id: 1,
    title: 'Salomon Mens Quest 4 GTX Hiking Boot',
    img: "https://productimage001.cotswoldoutdoor.com/productimages/316x474/b11242317070.jpg",
    materials: [
      'Upper: Nubuck Leathe',
      'Membrane: Gore-tex',
      'Insole: OrthoLite',
      'Sole: Contagrip'],
    features: [
      'Protective mudguard',
      'Protective toecap',
      'Gusseted tongue',
      'Water Repellent',
      'Ankle support',
      'Regular laces',
      'Eyelets',
      'Drop: 12mm',
      'Weight: 655g'
    ],
    colour: 'Magnet/Black/Quarry',
    description: "Designed for long expeditions and tough conditions, the Quest is grippy and supportive. Salomon have updated the chassis to target sensitive articulations and wrap the foot for extra support, while also keeping your stride fluid. No matter how tired you are or how heavy your pack, the Quest 4 GTX ensures a stable yet smooth ride on any terrain."
  },

  {
    id: 2,
    title: 'Scarpa Mens Trek GTX Boot',
    img: "https://productimage001.cotswoldoutdoor.com/productimages/316x474/b11241384046.jpg",
    materials: [
      'Upper: 2.4mm oiled nubuck calf leather',
      'Lining: Gore-Tex Performance Comfort',
      'Midsole: Comfort Flex Plus',
      'Outsole: Vibram'],
    features: [
      'Waterproof & breathable',
      'Protective rand around sides of boot',
      'Durable & grippy',
      'Water Repellent',
      'Ankle support',
      'Weight: 1.53kg (pair)'
    ],
    colour: 'Brown',
    description: "The Men's Trek GTX Boot from Scarpa is a hiking and trekking boot that will keep your feet protected and secure through long walks over tricky terrain whether you are carrying a pack or not. The ergonomic last of the boot has been created for those with low foot volume and slimmer heel in mind to help ensure everyone has a comfortable walking boot option that fits well. The durable leather upper combined with the Gore-Tex lining offers excellent waterproof protection as well as breathability to ensure a healthy environment for your foot. A durable protective toe rand around the edge of the boot helps protect against the inevitable scuffs and scrapes along the way to keep them in tip-top condition for longer."
  },
  {
    id: 3,
    title: 'Meindl Mens Tonale GoreTex Walking Boots',
    img: "https://productimage001.cotswoldoutdoor.com/productimages/316x474/331105396060.jpg",
    materials: [
      'Upper: nubuck leather & textile',
      'Lining: Gore-Tex Performance Comfort Footwear',
      'Midsole: dual density EVA',
      'Outsole: High Traction Contagrip'],
    features: [
      'Waterproof & breathable',
      '4D Advanced Chassis',
      'Protective rubber heel & toe cap',
      'Redesigned lugs ',
      'Gusseted tongue',
      'Heel foam',
      'EVA shaped OrthoLite footbed',
      'Heel strap',
      'Lace locker',
      'Weight: 640g',
    ],
    colour: 'Gray',
    description: `The Men's Quest 4D 3 GTX Boot from Salomon utilises a range of different technologies to offer excellent walking comfort for your feet in a lightweight and waterproof package. The innovative 4D Chassis design guides the foot on even the roughest terrain to ensure stability and help reduce fatigue during long days and while carrying heavy rucksacks, the Chassis also enables more forefoot flexion for a smoother ride that flows from step to step. The lug design on the outsole has been refined to promote sturdy grip on a huge range of terrains while the Gore-Tex Performance Comfort Footwear lining offers excellent wet weather protection that is breathable to ensure a healthy environment on the inside of the boot too. Smaller details like the rubber heel and toe protection, the Lace Locker and the gusseted tongue help to make life easier and more comfortable when exploring the outdoors, while you might not give them a second thought, you'd miss them considerably if they weren't there.`
  }
]

export default App;
