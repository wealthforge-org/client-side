import PrimaryHeader from '../../../Components/Ui/Headers/PrimaryHeader'
import PrimaryText from '../../../Components/Ui/Texts/PrimaryText'

const Header = ({name}) => {
    return (
        <div className="mb-8">
            <PrimaryHeader className="text-white mb-2">Portfolio Overview</PrimaryHeader>
            <p >Welcome back, <span className="font-semibold gradient-text">{name}</span></p>
        </div>
    )
}

export default Header