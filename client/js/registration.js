$( document ).ready( function ()
{
    $( "body" ).on( 'keyup, change', 'input', function ()
    {
        if ( check( $( '#regPassword' ).val() ) && checkEmail( $( '#regEmail' ).val() )
        )
        {
            if ( $( '.loginExist' ).text().length == 0 )
            {
                $( "#regSubmit" ).removeAttr( "disabled" );
            }

        } else
        {
            $( "#regSubmit" ).attr( "disabled", "disabled" );
        }
    } );

    function check( val )
    {
        val = $.trim( val )
        if ( val.length > 3 && val.length <= 10 )
        {
            return true
        } else
        {
            return false;
        }
    }

    function checkEmail( email )
    {
        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if ( pattern.test( email ) )
        {
            $( '#regEmail' ).css( { 'border': '3px solid #569b44' } );
            return true;
        } else
        {
            $( '#regEmail' ).css( { 'border': '1px solid #ff0000' } );
            return false;
        }
    }

} );

