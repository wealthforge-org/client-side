import PrimaryHeader from '../../../../../Components/Ui/Headers/PrimaryHeader'
import PrimaryText from '../../../../../Components/Ui/Texts/PrimaryText'
import PrimaryButton from '../../../../../Components/Ui/Buttons/PrimaryButton';
import SecondaryButton from '../../../../../Components/Ui/Buttons/SecondaryButton';
import { ArrowRight } from 'lucide-react';

const LeftSection = () => {
  return (
    <div className="space-y-8 items-left">
            <PrimaryHeader className={"flex flex-col items-start"}>
                <span className="gradient-text">AI-Powered</span>
                Wealth Management
            </PrimaryHeader>
            <PrimaryText
                className={"text-left"}
                text="Leverage artificial intelligence to make smarter investment decisions in crypto and stock markets. Our platform combines real-time data with predictive analytics."
            />
            <div className='flex flex-wrap gap-4'>
                <PrimaryButton
                    text={
                        <span className='flex flex-row gap-2'>
                            Get Started <ArrowRight />
                        </span>
                    }
                />
                <SecondaryButton text="Leave us a message"/>
            </div>
        </div>
  )
}

export default LeftSection
