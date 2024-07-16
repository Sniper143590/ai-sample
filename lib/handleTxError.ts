
const handleTxError = (error: any) => {
  const primaryError = error?.reason || error?.data?.message
  const nestedError = error?.error?.message
  const fallbackError = error.message

  const toastMessage = primaryError || nestedError || fallbackError
  return toastMessage
}

export default handleTxError
