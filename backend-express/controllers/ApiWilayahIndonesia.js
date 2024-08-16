
const getProvince = async (req, res) => {
    try {
        const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const data = await response.json();

        res.status(200).send({
            success: true,
            message: 'get province',
            data: data
        })


    } catch (error) {

        res.status(500).send({
            success: 'false',
            message: error
        })
    }
}



const getRegency = async (req, res) => {
    const { province } = req.params

    try {
        const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${province}.json`)
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json();
        res.status(200).send({
            success: true,
            message: 'get regency',
            data: data
        })


    } catch (error) {

        res.status(500).send({
            success: 'false',
            message: error
        })
    }
}




module.exports = { getProvince, getRegency }