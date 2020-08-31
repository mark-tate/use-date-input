/** @jsx jsx */
import { useRef, useState } from 'react'
import { jsx, Layout as BaseLayout, Main } from 'theme-ui'
import { Global } from '@emotion/core'

import global from '~theme/global'
import { Header } from "gatsby-theme-docz/src/components/Header/index";
import { Sidebar } from "gatsby-theme-docz/src/components/Sidebar/index";
import { MainContainer } from "gatsby-theme-docz/src/components/MainContainer/index";
import * as styles from './styles'

export const Layout = ({ children, doc }) => {
    const [open, setOpen] = useState(false)
    const nav = useRef();
    if (doc.value.fullPage) {
        return children;
    }
    return (
        <BaseLayout sx={{ '& > div': { flex: '1 1 auto' } }} data-testid="layout">
            <Global styles={global} />
            <Main sx={styles.main}>
                <Header onOpen={() => setOpen(s => !s)} />
                <div sx={styles.wrapper}>
                    <Sidebar
                        ref={nav}
                        open={open}
                        onFocus={() => setOpen(true)}
                        onBlur={() => setOpen(false)}
                        onClick={() => setOpen(false)}
                    />
                    <MainContainer data-testid="main-container">{children}</MainContainer>
                </div>
            </Main>
        </BaseLayout>
    )
}
