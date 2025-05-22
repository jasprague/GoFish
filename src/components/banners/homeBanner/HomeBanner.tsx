import styles from './HomeBanner.module.scss';
import Button from '@/components/button/Button';

export default function HomeBanner() {
    const isInBeta = true;
    return(
        <div className={styles.HomeBanner}>
            <h1><span className={styles.headingTitle}>Go Fish</span>, Bud.</h1>
            <h3>The fishing industry&apos;s online job board.</h3>
            {!isInBeta &&
                <div className="flex gap-10 flex-wrap justify-start">
                <Button text="Find a Job" link="/sign-up" variant="default" />
                <Button text="Search For Help" link="/help-out" variant="alt" />
                </div>
            }
            {isInBeta &&
                <div className="flex w-full flex-wrap justify-start">
                <form className="flex w-full flex-col gap-5">
                    <label htmlFor="name" className="sr-only">Enter Your Name</label>
                    <input type="name" name="name" id="name" placeholder="Enter Your Name" className="p-5" required />
                    <label htmlFor="email" className="sr-only">Enter Your Email</label>
                    <input type="email" name="email" id="email" placeholder="Enter Your Email" className="p-5" required />
                    <button className="p-5 bg-[#E98F35] button" type="submit">Join The Beta</button>
                </form>
                </div>
            }
        </div>
    )
}