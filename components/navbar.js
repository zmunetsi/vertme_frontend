
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Menu } from 'primereact/menu';
import { Avatar  } from 'primereact/avatar';
 
const Navbar = () => {
    const items = [
        {
            label: 'Dashboard', 
            icon: 'pi pi-fw pi-home',
            command: () => { window.location.href = '/dashboard'; }
        },
        {
            label: 'Questions', 
            icon: 'pi pi-fw pi-question',
            command: () => {
                window.location.href = '/questions';
            }
        },
        {
            label: 'Contact us',
            icon: 'pi pi-fw pi-phone',
            command: () => {
                window.location.href = '/contact';
            }
        }
     
    ];

    const userMenu = [
        {
            template: (item, options) => {
                return (
                    /* custom element */
                    <a className={options.className} target={item.target} onClick={options.onClick}>
                       <Avatar 
                       shape='circle'
                       image='/assets/images/default-avatar.png'
                       alt='avatar'
                       style={ { width: '4em', height: '4em' } }
                       />
                    </a>
                );
            }
        }
    ];

    const start = <img alt="logo" src="/vertme-logo.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="70" className="mr-2"></img>;
    const end = <Menu style={{ background: "none", border: "none", width: "auto", padding: "0"}} model={userMenu} />;

    return (
        <div>
            <div className="card">
                <Menubar model={items} start={start} end={end} />
            </div>
        </div>
    );
}

export default Navbar;
                 