/** @jsx jsx */
import { jsx, Flex } from 'theme-ui'
import { Link, useConfig } from 'docz'
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";

import * as styles from './styles'

export const Logo = () => {
    const config = useConfig();
    const theme = useTheme();
    const isSmallBreakpoint = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <Flex alignItems="center" sx={styles.logo} data-testid="logo">
            <Link to="/" sx={styles.link}>
                {isSmallBreakpoint ? config.shortTitle : config.title}
            </Link>
        </Flex>
    )
}
