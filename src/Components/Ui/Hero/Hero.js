import classes from './Hero.module.css'
import hero from './hero.jpeg'
import { useHistory } from 'react-router'

function Hero(){
    const history = useHistory()
    function heroButtonClickHandler(){
        history.push('/plan')
    }
    return(
        <div className={classes.hero}>
            <div className={classes['hero-text']}>
                <h1>Welcome to CK Trips</h1>
                <button onClick={heroButtonClickHandler} className={classes['hero-button']}>Plan Your Next Adventure</button>
            </div>
        <img alt="hero" src={hero}/>
        </div>
    )
}

export default Hero