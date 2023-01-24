import './AuthBgStyle.css'

export const AuthBg = (props) => {
    return (
        <div>
            <div className='bg-auth'>
                <div className='block-img bi1'></div>
                <div className='block-img bi2'></div>
                <div className='block-img bi3'></div>
                <div className='block-img bi4'></div>
                <div className='block-img bi5'></div>
                <div className='block-img bi6'></div>
                <div className='block-img bi7'></div>
                <div className='block-img bi8'></div>
                <div className='block-img bi9'></div>

                <div className='super-small-ball'/>

                <div className='heart heart-gray h1'/>
                <div className='heart heart-gray h2'/>
                <div className='heart heart-gray h3'/>
                <div className='heart heart-gray h4'/>
                <div className='heart heart-lightgray h5'/>

                <div className='small-ball small-gray sb1'/>
                <div className='small-ball small-gray sb2'/>
                <div className='small-ball small-lightgray sb3'/>

                <div className='small-medium-ball smb1'/>
                <div className='small-medium-ball smb2'/>
                <div className='small-medium-ball smb3'/>
                <div className='smb4'/>

                <div className='big-medium-ball bm-gray bm1'/>
                <div className='big-medium-ball bm-gray bm2'/>
                <div className='big-medium-ball bm-lightgray bm3'/>
                <div className='big-medium-ball bm-lightgray bm4'/>

                <div className='big-ball'/>
            </div>
            <div className='center'>
                {props.children}
            </div>
        </div>
    );
}