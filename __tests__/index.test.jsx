// first test if we have at least one sign up button in the page
// check if we have at least one login button in page

import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'

describe('<Home />', () => {
    
    it('should render sign up button', () => {
        render(<Home />)
         const signUpButtonText  = ` <span
         class="p-button-label p-c"
       >
         Sign up
       </span>`;
        expect(screen.getAllByRole('button', { name: signUpButtonText })).toHaveLength(1)
    })

})