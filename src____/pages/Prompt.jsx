import React from 'react'
// @ts-nocheck
import './prompt.css'
import { useRegisterSW } from 'virtual:pwa-register/react'

export function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      // eslint-disable-next-line prefer-template
      console.log('SW Registered: ' + r)
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    },
  })

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  return (
    <div className="ReloadPrompt-container">
      {(offlineReady || needRefresh) && (
        <div className="ReloadPrompt-toast">
          <div className="ReloadPrompt-message">
            {offlineReady ? (
              <span>Application pret pour fonctionner offline</span>
            ) : (
              <span>Nouvelle mise a jour de contenue disponible, clique sur le button Reload pour accepter.</span>
            )}
          </div>
          {needRefresh && (
            <button
              className="ReloadPrompt-toast-button reload"
              onClick={() => updateServiceWorker(true)}
            >
              Reload
            </button>
          )}
          <button className="ReloadPrompt-toast-button" onClick={close}>
            Close
          </button>
        </div>
      )}
    </div>
  )
}
