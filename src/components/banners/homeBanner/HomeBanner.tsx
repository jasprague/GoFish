import styles from './HomeBanner.module.scss';
import Button from '@/components/button/Button';

export default function HomeBanner() {
    return(
        <div className={styles.HomeBanner}>
            <h1><span className={styles.headingTitle}>Go Fish</span>, Bud.</h1>
            <h3>The fishing industry&apos;s online job board.</h3>
            <div className="flex gap-10 flex-wrap justify-start">
                <Button text="Find a Job" link="/sign-up" variant="default" />
                <Button text="Search For Help" link="/help-out" variant="alt" />

            </div>
        </div>
    )
}