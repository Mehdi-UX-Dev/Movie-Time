import useFetch from "../utils/useFetch"
import WatchProviderRegionMaker from "./regionsMaker";
  import Image from 'next/image'
  import loading_dot from '../public/loading_dot.svg'
import WatchProviderMedium from "./watchProviderMedium";
        
        const WatchProvider = () => {
      const {user : data} = useFetch('providers', `https://api.themoviedb.org/3/watch/providers/regions?api_key=${process.env.NEXT_PUBLIC_APIV3}&language=en-US`)
       ;
         if(data === undefined) return (<div><Image src={loading_dot} alt={'loading'}/></div>)   
      return (
            <div className="border-2 border-darkBlue rounded w-11/12 mx-auto ">
              <form >
                {/* search */}
                <h3 className="capitalize font-semibold ">{'where to watch'}</h3>
                 <WatchProviderRegionMaker {...data}/>
                 <WatchProviderMedium/>
                </form>
            </div>
          )
        }
        
        export default WatchProvider